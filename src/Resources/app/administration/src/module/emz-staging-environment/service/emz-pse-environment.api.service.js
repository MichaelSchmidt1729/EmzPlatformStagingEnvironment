import ApiService from 'src/core/service/api.service';

class StagingEnvironmentApiService extends ApiService {
    constructor(httpClient, loginService, apiEndpoint = 'environment') {
        super(httpClient, loginService, apiEndpoint);
        this.name = 'stagingEnvironmentApiService';
    }

    syncFiles({ environmentId }, additionalParams = {}, additionalHeaders = {}) {
        const headers = this.getBasicHeaders({});
        const payload = {
            environmentId
        };
        
        return this.httpClient.post('/_action/emz_pse/environment/sync_files', payload, { headers });
    }

    cloneDatabase({ environmentId }, additionalParams = {}, additionalHeaders = {})
    {
        const headers = this.getBasicHeaders();
        const payload = {
            environmentId
        };

        return this.httpClient.post('/_action/emz_pse/environment/clone_database', payload, { headers });
    }

    updateSettings({ environmentId }, additionalParams = {}, additionalHeaders = {}) 
    {
        const headers = this.getBasicHeaders();
        const payload = {
            environmentId
        };

        return this.httpClient.post('/_action/emz_pse/environment/update_settings', payload, { headers });
    }

    getLastSync({ environmentId }, additionalParams = {}, additionalHeaders = {})
    {
        const headers = this.getBasicHeaders();
        const payload = {
            environmentId
        };

        return this.httpClient.post('/_action/emz_pse/environment/get_last_sync', payload, { headers });
    }

    getClearingState({ environmentId }, additionalParams = {}, additionalHeaders = {})
    {
        const headers = this.getBasicHeaders();
        const payload = {
            environmentId
        };

        return this.httpClient.post('/_action/emz_pse/environment/get_clearing_state', payload, { headers });
    }

    clearDatabase({ environmentId }, additionalParams = {}, additionalHeaders = {})
    {
        const headers = this.getBasicHeaders();
        const payload = {
            environmentId
        };

        return this.httpClient.post('/_action/emz_pse/environment/clear_database', payload, { headers });
    }

    clearFiles({ environmentId }, additionalParams = {}, additionalHeaders = {})
    {
        const headers = this.getBasicHeaders();
        const payload = {
            environmentId
        };

        return this.httpClient.post('/_action/emz_pse/environment/clear_files', payload, { headers });
    }
}

export default StagingEnvironmentApiService;