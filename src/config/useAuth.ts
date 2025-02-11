import { ref } from 'vue'
import { myMsalObj, state} from "@/config/msalConfig.ts";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function useAuth() {
    const isAuthenticated = ref(false)

    const login = async () => {
        try {
            if (!myMsalObj) {
                throw new Error('MSAL not initialized')
            }
            await myMsalObj.loginRedirect()
            isAuthenticated.value = true

            const loginResponse = await myMsalObj.loginRedirect()
            isAuthenticated.value = true

            console.log('Login succ: ', loginResponse)
        } catch (error) {
            console.error('login err: ', error)
        }
    }

    const logout = () => {
        if (!myMsalObj) {
            throw new Error('MSAL not initializes')
        }
        myMsalObj.logoutRedirect()
        isAuthenticated.value = false
        console.log('Logged out')
    }

    const handleRedirect = async () => {
        try {
            await myMsalObj.handleRedirectPromise()

            state.isAuthenticated = myMsalObj.getAllAccounts().length > 0
            state.user = myMsalObj.getAllAccounts()[0]

                    // Удаляем хэш из URL
            if (window.location.hash) {
              window.history.replaceState({}, document.title, window.location.pathname);
            }

            await getUserDetails(state.user.username)

        } catch (error) {
            console.error('Redirect error: ', error)
        }
    }

    async function getUserDetails(email: string) {
  try {
    const response = await axios.get(`${backendUrl}/api/user_details/${email}`);
    console.log('User details:', response.data);

// Обновляем localUser с помощью Object.assign
    Object.assign(state.localUser, {
      groupId: response.data.edu_group,
      teacherId: response.data.teacher,
      type: response.data.user_type,
      id: response.data.id,
      shortName: response.data.user_shortname,
      groupName: response.data.group_name,
      teacherName: response.data.teacher_name
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка при запросе:', error);
  }
}
    const getToken = async () => {
    if (!myMsalObj) {
      throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
    }
    try {
      const accounts = myMsalObj.getAllAccounts()
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please login first.')
      }
      const silentRequest = {
        scopes: ['api://79f1f415-f349-4008-affd-18cbb6c54b95/Po.Read'],
        account: accounts[0]
      }
      const silentResponse = await myMsalObj.acquireTokenSilent(silentRequest)
      return silentResponse.accessToken
    } catch (error) {
      console.error('Silent token acquisition error:', error)
    }
  }
  const registerAuthorizationHeaderInterceptor = () => {
    axios.interceptors.request.use(async (config) => {
      const accessToken = await getToken()
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    })
  }
    return { isAuthenticated, login, logout, handleRedirect, registerAuthorizationHeaderInterceptor}
}