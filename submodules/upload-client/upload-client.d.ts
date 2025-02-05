// Generated by dts-bundle-generator v5.4.0
// Node dependencies was removed manually

/// <reference types="node" />

export declare type GeoLocation = {
	latitude: number;
	longitude: number;
};
export declare type ImageInfo = {
	height: number;
	width: number;
	geoLocation: GeoLocation | null;
	datetimeOriginal: string;
	format: string;
	colorMode: string;
	dpi: {
		"0": number;
		"1": number;
	} | null;
	orientation: number | null;
	sequence: boolean | null;
};
export declare type AudioInfo = {
	bitrate: number | null;
	codec: string | null;
	sampleRate: number | null;
	channels: string | null;
};
export declare type VideoInfo = {
	duration: number;
	format: string;
	bitrate: number;
	audio: AudioInfo | null;
	video: {
		height: number;
		width: number;
		frameRate: number;
		bitrate: number;
		codec: string;
	};
};
export declare type ContentInfo = {
	content_info: {
		mime?: {
			mime: string;
			type: string;
			subtype: string;
		};
		image?: ImageInfo;
		video?: VideoInfo;
	};
};
export declare type FileInfo = {
	size: number;
	done: number;
	total: number;
	uuid: Uuid;
	fileId: Uuid;
	originalFilename: string;
	filename: string;
	mimeType: string;
	isImage: boolean;
	isStored: boolean;
	isReady: string;
	imageInfo: ImageInfo | null;
	videoInfo: VideoInfo | null;
	contentInfo: ContentInfo | null;
	s3Bucket?: string;
	metadata?: Metadata;
};
export declare type GroupInfo = {
	datetimeCreated: string;
	datetimeStored: string | null;
	filesCount: string;
	cdnUrl: string;
	files: FileInfo[];
	url: string;
	id: GroupId;
};
export declare type Token = string;
export declare type Uuid = string;
export declare type GroupId = string;
export declare type Url = string;
export declare type ComputableProgressInfo = {
	isComputable: true;
	value: number;
};
export declare type UnknownProgressInfo = {
	isComputable: false;
};
export declare type ProgressCallback<T = ComputableProgressInfo | UnknownProgressInfo> = (arg: T) => void;
export declare type Metadata = {
	[key: string]: string;
};
export interface DefaultSettings {
	baseCDN: string;
	baseURL: string;
	maxContentLength: number;
	retryThrottledRequestMaxTimes: number;
	multipartMinFileSize: number;
	multipartChunkSize: number;
	multipartMinLastPartSize: number;
	maxConcurrentRequests: number;
	multipartMaxAttempts: number;
	pollingTimeoutMilliseconds: number;
	pusherKey: string;
}
export interface Settings extends Partial<DefaultSettings> {
	publicKey: string;
	fileName?: string;
	contentType?: string;
	store?: boolean;
	secureSignature?: string;
	secureExpire?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	checkForUrlDuplicates?: boolean;
	saveUrlForRecurrentUploads?: boolean;
	source?: string;
	jsonpCallback?: string;
}
export declare type CustomUserAgentOptions = {
	publicKey: string;
	libraryName: string;
	libraryVersion: string;
	languageName: string;
	integration?: string;
};
export declare type CustomUserAgentFn = (options: CustomUserAgentOptions) => string;
export declare type CustomUserAgent = string | CustomUserAgentFn;
export declare type Headers = {
	[key: string]: string | string[] | undefined;
};
export declare type ErrorRequestInfo = {
	method?: string;
	url: string;
	query?: string;
	data?: FormData | BrowserFile | NodeFile;
	headers?: Headers;
};
export declare type BrowserFile = Blob | File;
export declare type NodeFile = Buffer;
export declare type BaseResponse = {
	file: Uuid;
};
export declare type BaseOptions = {
	publicKey: string;
	fileName?: string;
	baseURL?: string;
	secureSignature?: string;
	secureExpire?: string;
	store?: boolean;
	signal?: AbortSignal;
	onProgress?: ProgressCallback;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
	metadata?: Metadata;
};
declare function base(file: NodeFile | BrowserFile, { publicKey, fileName, baseURL, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, metadata }: BaseOptions): Promise<BaseResponse>;
declare enum TypeEnum {
	Token = "token",
	FileInfo = "file_info"
}
export declare type TokenResponse = {
	type: TypeEnum.Token;
	token: string;
};
export declare type FileInfoResponse = {
	type: TypeEnum.FileInfo;
} & FileInfo;
export declare type FromUrlSuccessResponse = FileInfoResponse | TokenResponse;
export declare type FromUrlResponse = FromUrlSuccessResponse;
export declare type FromUrlOptions = {
	publicKey: string;
	baseURL?: string;
	store?: boolean;
	fileName?: string;
	checkForUrlDuplicates?: boolean;
	saveUrlForRecurrentUploads?: boolean;
	secureSignature?: string;
	secureExpire?: string;
	signal?: AbortSignal;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
	metadata?: Metadata;
};
declare function fromUrl(sourceUrl: Url, { publicKey, baseURL, store, fileName, checkForUrlDuplicates, saveUrlForRecurrentUploads, secureSignature, secureExpire, source, signal, integration, userAgent, retryThrottledRequestMaxTimes, metadata }: FromUrlOptions): Promise<FromUrlSuccessResponse>;
declare enum Status {
	Unknown = "unknown",
	Waiting = "waiting",
	Progress = "progress",
	Error = "error",
	Success = "success"
}
export declare type StatusUnknownResponse = {
	status: Status.Unknown;
};
export declare type StatusWaitingResponse = {
	status: Status.Waiting;
};
export declare type StatusProgressResponse = {
	status: Status.Progress;
	size: number;
	done: number;
	total: number | "unknown";
};
export declare type StatusErrorResponse = {
	status: Status.Error;
	error: string;
	errorCode: string;
};
export declare type StatusSuccessResponse = {
	status: Status.Success;
} & FileInfo;
export declare type FromUrlStatusResponse = StatusUnknownResponse | StatusWaitingResponse | StatusProgressResponse | StatusErrorResponse | StatusSuccessResponse;
export declare type FromUrlStatusOptions = {
	publicKey?: string;
	baseURL?: string;
	signal?: AbortSignal;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
};
declare function fromUrlStatus(token: Token, { publicKey, baseURL, signal, integration, userAgent, retryThrottledRequestMaxTimes }?: FromUrlStatusOptions): Promise<FromUrlStatusResponse>;
export declare type GroupOptions = {
	publicKey: string;
	baseURL?: string;
	jsonpCallback?: string;
	secureSignature?: string;
	secureExpire?: string;
	signal?: AbortSignal;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
};
declare function group(uuids: Uuid[], { publicKey, baseURL, jsonpCallback, secureSignature, secureExpire, signal, source, integration, userAgent, retryThrottledRequestMaxTimes }: GroupOptions): Promise<GroupInfo>;
export declare type GroupInfoOptions = {
	publicKey: string;
	baseURL?: string;
	signal?: AbortSignal;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
};
declare function groupInfo(id: GroupId, { publicKey, baseURL, signal, source, integration, userAgent, retryThrottledRequestMaxTimes }: GroupInfoOptions): Promise<GroupInfo>;
export declare type InfoOptions = {
	publicKey: string;
	baseURL?: string;
	signal?: AbortSignal;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
};
declare function info(uuid: Uuid, { publicKey, baseURL, signal, source, integration, userAgent, retryThrottledRequestMaxTimes }: InfoOptions): Promise<FileInfo>;
export declare type MultipartStartOptions = {
	publicKey: string;
	contentType?: string;
	fileName?: string;
	baseURL?: string;
	secureSignature?: string;
	secureExpire?: string;
	store?: boolean;
	multipartChunkSize?: number;
	signal?: AbortSignal;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
	metadata?: Metadata;
};
export declare type MultipartPart = string;
export declare type MultipartStartResponse = {
	parts: MultipartPart[];
	uuid: Uuid;
};
declare function multipartStart(size: number, { publicKey, contentType, fileName, multipartChunkSize, baseURL, secureSignature, secureExpire, store, signal, source, integration, userAgent, retryThrottledRequestMaxTimes, metadata }: MultipartStartOptions): Promise<MultipartStartResponse>;
export declare type MultipartUploadOptions = {
	publicKey?: string;
	signal?: AbortSignal;
	onProgress?: ProgressCallback<ComputableProgressInfo>;
	integration?: string;
	retryThrottledRequestMaxTimes?: number;
};
export declare type MultipartUploadResponse = {
	code?: number;
};
declare function multipartUpload(part: NodeFile | BrowserFile, url: MultipartPart, { signal, onProgress }: MultipartUploadOptions): Promise<MultipartUploadResponse>;
export declare type MultipartCompleteOptions = {
	publicKey: string;
	baseURL?: string;
	signal?: AbortSignal;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
};
declare function multipartComplete(uuid: Uuid, { publicKey, baseURL, source, signal, integration, userAgent, retryThrottledRequestMaxTimes }: MultipartCompleteOptions): Promise<FileInfo>;
export declare class UploadcareFile {
	readonly uuid: Uuid;
	readonly name: null | string;
	readonly size: null | number;
	readonly isStored: null | boolean;
	readonly isImage: null | boolean;
	readonly mimeType: null | string;
	readonly cdnUrl: null | string;
	readonly cdnUrlModifiers: null | string;
	readonly originalUrl: null | string;
	readonly originalFilename: null | string;
	readonly imageInfo: null | ImageInfo;
	readonly videoInfo: null | VideoInfo;
	readonly contentInfo: null | ContentInfo;
	readonly metadata: null | Metadata;
	constructor(fileInfo: FileInfo, { baseCDN, defaultEffects, fileName }: {
		baseCDN?: string;
		defaultEffects?: string;
		fileName?: string;
	});
}
export declare type FromObjectOptions = {
	publicKey: string;
	fileName?: string;
	baseURL?: string;
	secureSignature?: string;
	secureExpire?: string;
	store?: boolean;
	signal?: AbortSignal;
	onProgress?: ProgressCallback;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
	baseCDN?: string;
	metadata?: Metadata;
};
declare const uploadFromObject: (file: NodeFile | BrowserFile, { publicKey, fileName, baseURL, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, baseCDN, metadata }: FromObjectOptions) => Promise<UploadcareFile>;
export declare type UploadFromUrlOptions = {
	baseCDN?: string;
	onProgress?: ProgressCallback;
	pusherKey?: string;
} & FromUrlOptions;
export declare const uploadFromUrl: (sourceUrl: string, { publicKey, fileName, baseURL, baseCDN, checkForUrlDuplicates, saveUrlForRecurrentUploads, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, pusherKey, metadata }: UploadFromUrlOptions) => Promise<UploadcareFile>;
export declare type FromUploadedOptions = {
	publicKey: string;
	fileName?: string;
	baseURL?: string;
	signal?: AbortSignal;
	onProgress?: ProgressCallback;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
	baseCDN?: string;
};
export declare const uploadFromUploaded: (uuid: Uuid, { publicKey, fileName, baseURL, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, baseCDN }: FromUploadedOptions) => Promise<UploadcareFile>;
export declare type MultipartOptions = {
	publicKey: string;
	contentType?: string;
	multipartChunkSize?: number;
	fileName?: string;
	fileSize?: number;
	baseURL?: string;
	secureSignature?: string;
	secureExpire?: string;
	store?: boolean;
	signal?: AbortSignal;
	onProgress?: ProgressCallback<ComputableProgressInfo>;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
	maxConcurrentRequests?: number;
	multipartMaxAttempts?: number;
	baseCDN?: string;
	metadata?: Metadata;
};
export declare const uploadMultipart: (file: NodeFile | BrowserFile, { publicKey, fileName, fileSize, baseURL, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, contentType, multipartChunkSize, maxConcurrentRequests, multipartMaxAttempts, baseCDN, metadata }: MultipartOptions) => Promise<UploadcareFile>;
export declare type FileFromOptions = {
	publicKey: string;
	fileName?: string;
	baseURL?: string;
	secureSignature?: string;
	secureExpire?: string;
	store?: boolean;
	signal?: AbortSignal;
	onProgress?: ProgressCallback;
	source?: string;
	integration?: string;
	userAgent?: CustomUserAgent;
	retryThrottledRequestMaxTimes?: number;
	contentType?: string;
	multipartMinFileSize?: number;
	multipartChunkSize?: number;
	multipartMaxAttempts?: number;
	maxConcurrentRequests?: number;
	baseCDN?: string;
	checkForUrlDuplicates?: boolean;
	saveUrlForRecurrentUploads?: boolean;
	pusherKey?: string;
	metadata?: Metadata;
};
/**
 * Uploads file from provided data.
 */
export declare function uploadFile(data: NodeFile | BrowserFile | Url | Uuid, { publicKey, fileName, baseURL, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, contentType, multipartMinFileSize, multipartChunkSize, multipartMaxAttempts, maxConcurrentRequests, baseCDN, checkForUrlDuplicates, saveUrlForRecurrentUploads, pusherKey, metadata }: FileFromOptions): Promise<UploadcareFile>;
export declare class UploadcareGroup {
	readonly uuid: GroupId;
	readonly filesCount: string;
	readonly totalSize: number;
	readonly isStored: boolean;
	readonly isImage: boolean;
	readonly cdnUrl: string;
	readonly files: UploadcareFile[];
	readonly createdAt: string;
	readonly storedAt: string | null;
	constructor(groupInfo: GroupInfo, files: UploadcareFile[]);
}
export declare type GroupFromOptions = {
	defaultEffects?: string;
	jsonpCallback?: string;
};
declare function uploadFileGroup(data: (NodeFile | BrowserFile)[] | Url[] | Uuid[], { publicKey, fileName, baseURL, secureSignature, secureExpire, store, signal, onProgress, source, integration, userAgent, retryThrottledRequestMaxTimes, contentType, multipartChunkSize, baseCDN, jsonpCallback, defaultEffects }: FileFromOptions & GroupFromOptions): Promise<UploadcareGroup>;
declare class UploadClient {
	private settings;
	constructor(settings: Settings);
	updateSettings(newSettings: Settings): void;
	getSettings(): Settings;
	base(file: NodeFile | BrowserFile, options?: Partial<BaseOptions>): Promise<BaseResponse>;
	info(uuid: Uuid, options?: Partial<InfoOptions>): Promise<FileInfo>;
	fromUrl(sourceUrl: Url, options?: Partial<FromUrlOptions>): Promise<FromUrlResponse>;
	fromUrlStatus(token: Token, options?: Partial<FromUrlStatusOptions>): Promise<FromUrlStatusResponse>;
	group(uuids: Uuid[], options?: Partial<GroupOptions>): Promise<GroupInfo>;
	groupInfo(id: GroupId, options?: Partial<GroupInfoOptions>): Promise<GroupInfo>;
	multipartStart(size: number, options?: Partial<MultipartStartOptions>): Promise<MultipartStartResponse>;
	multipartUpload(part: Buffer | Blob, url: MultipartPart, options?: Partial<MultipartUploadOptions>): Promise<MultipartUploadResponse>;
	multipartComplete(uuid: Uuid, options?: Partial<MultipartCompleteOptions>): Promise<FileInfo>;
	uploadFile(data: NodeFile | BrowserFile | Url | Uuid, options?: Partial<FileFromOptions>): Promise<UploadcareFile>;
	uploadFileGroup(data: (NodeFile | BrowserFile)[] | Url[] | Uuid[], options?: Partial<FileFromOptions & GroupFromOptions>): Promise<UploadcareGroup>;
}
export declare type ErrorResponseInfo = {
	error?: {
		statusCode: number;
		content: string;
		errorCode: string;
	};
};
export declare class UploadClientError extends Error {
	isCancel?: boolean;
	readonly code?: string;
	readonly request?: ErrorRequestInfo;
	readonly response?: ErrorResponseInfo;
	readonly headers?: Headers;
	constructor(message: string, code?: string, request?: ErrorRequestInfo, response?: ErrorResponseInfo, headers?: Headers);
}

export {
	UploadClient as UploadClient,
	base as base,
	fromUrl as fromUrl,
	fromUrlStatus as fromUrlStatus,
	group as group,
	groupInfo as groupInfo,
	info as info,
	multipartComplete as multipartComplete,
	multipartStart as multipartStart,
	multipartUpload as multipartUpload,
	uploadFileGroup as uploadFileGroup,
	uploadFromObject as uploadBase,
};

export {};
