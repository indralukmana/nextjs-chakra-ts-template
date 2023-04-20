import { AxiosError } from 'axios';


export interface Response<
	R = Record<string, string>,
	M = Record<string, string>
> {
	alert: Record<string, string>;
	data?: R;
	meta?: M;
}

export interface ErrorResponse {
	alert?: Record<string, string>;
}

export type AxiosErrorResponse = AxiosError<ErrorResponse>;
