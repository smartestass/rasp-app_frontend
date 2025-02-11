import {PublicClientApplication, type AccountInfo, type RedirectRequest} from "@azure/msal-browser";
import {reactive, ref} from "vue";
export const msalConfig = {
    auth: {
        clientId: '25dfbd5a-b156-4da3-b45d-2fe614e8268d',
        authority: 'https://login.microsoftonline.com/19ba435d-e46c-436a-84f2-1b01e693e480',
        redirectUri: 'http://localhost:5173'
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false
    },
}
export const graphScopes: RedirectRequest = {
    scopes: ['user.read']
};
export const state = reactive({
    isAuthenticated: false,
    user: null as AccountInfo | null,
    localUser: {
        type: null as string | null,
        id: null as number | null,
        shortName: null as string | null,
        groupId: null as number | null,
        teacherId: null as number | null,
        groupName: null as string | null,
        teacherName: null as string | null
    }
});

export const myMsalObj = new PublicClientApplication(msalConfig)