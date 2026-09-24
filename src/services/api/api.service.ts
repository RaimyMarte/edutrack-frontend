import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { ErrorResponseMessageService } from '../../utils/error-response-message';
import { SuccessResponseMessageService } from '../../utils/success-response-message';
import { environment } from '../../environments/environment.development';
import { MockApiService } from './mock-api.service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    public isLoading: boolean = false;
    private baseURL = environment.apiUrl;
    private axiosInstance = axios.create({
        baseURL: this.baseURL,
    });

    constructor(
        private errorResponseMessageService: ErrorResponseMessageService,
        private successResponseMessageService: SuccessResponseMessageService,
        private mockApiService: MockApiService
    ) { }

    // This method will handle all types of HTTP requests (GET, POST, PUT, DELETE)
    async request(
        method: string,
        endpoint: string,
        body?: any,
        headers?: AxiosRequestConfig['headers']
    ) {
        try {
            this.isLoading = true;

            let responseData: any;

            if (environment.useMock) {
                responseData = await this.mockApiService.handleRequest(method, endpoint, body);
            } else {
                const config: AxiosRequestConfig = {
                    method: method,
                    url: endpoint,
                    data: body,
                    headers: {
                        'APIKey': environment.apiKey,
                        ...headers,
                    },
                };

                const response = await this.axiosInstance(config);
                responseData = response.data;
            }

            if (!responseData?.isSuccess) {
                throw new Error(responseData?.message || 'Something went wrong');
            }

            if (method !== 'GET') {
                this.successResponseMessageService.showSuccess(responseData);
            }

            return responseData;
        } catch (error: any) {
            return this.errorResponseMessageService.handleError(error);
        } finally {
            this.isLoading = false;
        }
    }

    async get(endpoint: string, headers?: AxiosRequestConfig['headers']) {
        return this.request('GET', endpoint, undefined, headers);
    }

    async post(endpoint: string, body: any, headers?: AxiosRequestConfig['headers']) {
        return this.request('POST', endpoint, body, headers);
    }

    async patch(endpoint: string, body: any, headers?: AxiosRequestConfig['headers']) {
        return this.request('PATCH', endpoint, body, headers);
    }

    async delete(endpoint: string, headers?: AxiosRequestConfig['headers']) {
        return this.request('DELETE', endpoint, undefined, headers);
    }
}
