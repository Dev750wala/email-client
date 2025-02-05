import axios from "axios";
import { SyncResponse, SyncUpdatedResponse } from "./types";
import { resolve } from "path";
import { headers } from "next/headers";

export class Account {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    private async startSync() {
        const response = await axios.post<SyncResponse>("https://api.aurinko.io/v1/email/sync", {}, {
            headers: {
                Authorization: `Bearer ${this.token}`
            },
            params: {
                daysWithin: 2,
                body: 'html'
            }
        })
        return response.data;
    }

    async getUpdatedEmails({deltaToken, pageToken}: {deltaToken?: string, pageToken?: string}) {
        let params: Record<string, string> = {};
        if(deltaToken) params.deltaToken = deltaToken;
        if(pageToken) params.pageToken = pageToken;

        const response = await axios.get<SyncUpdatedResponse>("https://api.aurinko.io/v1/email/sync/updated", {
            headers: {
                Authorization: `Bearer ${this.token}`
            },
            params
        })
        return response.data;
    }

    async performInitialSync() {
        try {
            let syncResponse = await this.startSync();
            while (!syncResponse.ready) {
                await new Promise(resolve => setTimeout(resolve, 1000))
                syncResponse = await this.startSync();
            }

            // get the delta token
            let storedDeltaToken: string = syncResponse.syncUpdatedToken;

            let updatedResponse = await this.getUpdatedEmails({ deltaToken: storedDeltaToken })

            if(updatedResponse.nextDeltaToken) {
                // completed sync
            }
        } catch (error) {
            console.log(error);
        }
    }
}