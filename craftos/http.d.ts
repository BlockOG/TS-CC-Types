/** @noSelfInFile */

/**
 * Make HTTP requests, sending and receiving data to a remote web server.
 *
 * | API                                                    | Description                                              |
 * | ------------------------------------------------------ | -------------------------------------------------------- |
 * | {@link get get(...)}                                   | Make a HTTP GET request to the given url.                |
 * | {@link post post(...)}                                 | Make a HTTP POST request to the given url.               |
 * | {@link request request(...)}                           | Asynchronously make a HTTP request to the given url.     |
 * | {@link checkURLAsync checkURLAsync(url)}               | Asynchronously determine whether a URL can be requested. |
 * | {@link checkURL checkURL(url)}                         | Determine whether a URL can be requested.                |
 * | {@link websocketAsync websocketAsync(url [, headers])} | Asynchronously open a websocket.                         |
 * | {@link websocket websocket(url [, headers])}           | Open a websocket.                                        |
 *
 * @see {@link https://tweaked.cc/guide/local_ips.html Allowing access to local IPs} To allow
 * accessing servers running on your local network.
 * @since 1.1
 */
declare interface HTTP {
    /**
     * Make a HTTP GET request to the given url.
     *
     * @param urlOrRequest The url to request or options for the request. See @{http.request} for
     *                     details on how these options behave.
     * @param [headers] Additional headers to send as part of this request.
     * @param [binary] Whether to make a binary HTTP request. If true, the body will not be UTF-8
     *        encoded, and the received response will not be decoded.
     * @returns Response The resulting http response, which can be read from or `undefined` when the
     *          http request failed, such as in the event of a 404 error or connection timeout.
     * @returns A message detailing why the request failed.
     * @returns The failing http response, if available.
     * @changed 1.63 Added argument for headers.
     * @changed 1.80pr1 Response handles are now returned on error if available.
     * @changed 1.80pr1 Added argument for binary handles.
     * @changed 1.80pr1.6 Added support for table argument.
     * @changed 1.86.0 Added PATCH and TRACE methods.
     * @example
     *     // Make a request to https://example.tweaked.cc, and print the returned page.
     *     let request = http.get("https://example.tweaked.cc");
     *     print(request.readAll());
     *     // => HTTP is working!
     *     request.close();
     */
    get(url: string, headers?: HTTPHeaders, binary?: boolean): ResponseOrFail;
    get(request: HTTPRequestOptions): ResponseOrFail;

    /**
     * Make a HTTP POST request to the given url.
     *
     * @param urlOrRequest The url to request or options for the request. See {@link http.request}
     *                     for details on how these options behave.
     * @param body The body of the POST request.
     * @param [headers] Additional headers to send as part of this request.
     * @param [binary] Whether to make a binary HTTP request. If true, the body will not be UTF-8
     *        encoded, and the received response will not be decoded.
     * @returns The resulting http response, which can be read from or `undefined` when the http
     *          request failed, such as in the event of a 404 error or connection timeout.
     * @returns A message detailing why the request failed.
     * @returns The failing http response, if available.
     * @since 1.31
     * @changed 1.63 Added argument for headers.
     * @changed 1.80pr1 Response handles are now returned on error if available.
     * @changed 1.80pr1 Added argument for binary handles.
     * @changed 1.80pr1.6 Added support for table argument.
     * @changed 1.86.0 Added `PATCH` and `TRACE` methods.
     */
    post(
        url: string,
        body: string,
        headers?: HTTPHeaders,
        binary?: boolean
    ): ResponseOrFail;
    post(request: HTTPRequestOptions): ResponseOrFail;

    /**
     * Asynchronously make a HTTP request to the given url.
     *
     * This returns immediately, a
     * {@link https://tweaked.cc/event/http_success.html http_success} or
     * {@link https://tweaked.cc/event/http_failure.html http_failure} will be queued once the
     * request has completed.
     *
     * @param urlOrRequest The url to request or options for the request. This table form is an
     *                     expanded version of the previous syntax. All arguments from above are
     * passed in as fields instead (for instance, `http.request("https://example.com")` becomes
     * `http.request { url = "https://example.com" }`).
     *
     * This table also accepts several additional options:
     *  - `method`: Which HTTP method to use, for instance `"PATCH"` or `"DELETE"`.
     *  - `redirect`: Whether to follow HTTP redirects. Defaults to true.
     * @param [body] An optional string containing the body of the request. If specified, a `POST`
     *        request will be made instead.
     * @param [headers] Additional headers to send as part of this request.
     * @param [binary] Whether to make a binary HTTP request. If true, the body will not be UTF-8
     *        encoded, and the received response will not be decoded.
     * @see {@link http.get} For a synchronous way to make GET requests.
     * @see {@link http.post} For a synchronous way to make POST requests.
     * @changed 1.63 Added argument for headers.
     * @changed 1.80pr1 Added argument for binary handles.
     * @changed 1.80pr1.6 Added support for table argument.
     * @changed 1.86.0 Added PATCH and TRACE methods.
     */
    request(
        url: string,
        body?: string,
        headers?: HTTPHeaders,
        binary?: boolean
    ): void;
    request(request: HTTPRequestOptions): void;

    /**
     * Asynchronously determine whether a URL can be requested. If this returns `true`, one should
     * also listen for {@link https://tweaked.cc/event/http_check.html http_check} which will
     * container further information about whether the URL is allowed or not.
     *
     * @param url The URL to check.
     * @returns Whether this url is not invalid or invalid. Not invalid does not imply that it is
     *          allowed - see the comment above.
     * @returns A reason why this URL is not valid (for instance, if it is malformed, or blocked).
     * @see {@link http.checkURL} For a synchronous version.
     */
    checkURLAsync(
        url: string
    ): LuaMultiReturn<[true, undefined]> | LuaMultiReturn<[false, string]>;

    /**
     * Determine whether a URL can be requested.
     *
     * If this returns `true`, one should also listen for
     * {@link https://tweaked.cc/event/http_check.html http_check} which will
     * container further information about whether the URL is allowed or not.
     *
     * @param url The URL to check.
     * @returns Whether this url is not invalid or invalid. Not invalid does not imply that it is
     *          allowed - see the comment above.
     * @returns A reason why this URL is not valid (for instance, if it is malformed, or blocked).
     * @see {@link http.checkURLAsync} For an asynchronous version.
     * @example
     *     print(http.checkURL("https://example.tweaked.cc/"));
     *     // => true
     *     print(http.checkURL("http://localhost/"));
     *     // => false Domain not permitted
     *     print(http.checkURL("not a url"));
     *     // => false URL malformed
     */
    checkURL(
        url: string
    ): LuaMultiReturn<[true, undefined]> | LuaMultiReturn<[false, string]>;

    /**
     * Asynchronously open a websocket. This returns immediately, a
     * {@link https://tweaked.cc/event/websocket_success.html websocket_success} or
     * {@link https://tweaked.cc/event/websocket_failure.html websocket_failure}
     * will be queued once the request has completed.
     *
     * @param url The websocket url to connect to. This should have the
     * `ws://` or `wss://` protocol.
     * @param [headers] Additional headers to send as part of the initial websocket connection.
     * @since 1.80pr1.3
     * @changed 1.95.3 Added User-Agent to default headers.
     */
    websocketAsync(url: string, headers?: HTTPHeaders): void;

    /**
     * Open a websocket.
     *
     * @param url The websocket url to connect to. This should have the
     * `ws://` or `wss://` protocol.
     * @param [headers] Additional headers to send as part of the initial websocket connection.
     * @returns The websocket connection or `false` if the websocket connection failed.
     * @returns An error message describing why the connection failed.
     * @since 1.80pr1.1
     * @changed 1.80pr1.3 No longer asynchronous.
     * @changed 1.95.3 Added User-Agent to default headers.
     */
    websocket(
        url: string,
        headers?: HTTPHeaders
    ): LuaMultiReturn<[WebSocket, undefined]> | LuaMultiReturn<[false, string]>;
}

declare const http: HTTP;

declare type HTTPHeaders = Record<string, string>;

/** @noSelf */
declare interface HTTPRequestOptions {
    /** The URL to request. */
    url: string;
    /** The HTTP method to use. Defaults to `GET`. */
    method?: string;
    /** Additional headers to send as part of this request. */
    headers?: HTTPHeaders;
    /** The body to send as part of this request. */
    body?: string;
    /**
     * Whether to make a binary HTTP request. If true, the body will not be UTF-8 encoded, and the
     * received response will not be decoded.
     */
    binary?: boolean;
}

/**
 * A http response. This provides the same methods as a {@link fs.ReadHandle file} (or
 * {@link fs.BinaryReadHandle binary file} if the request used binary mode), though provides several
 * request specific methods.
 *
 * @see {@link http.request} On how to make http requests.
 * @noSelf
 */
declare interface Response {
    /**
     * Returns the response code and response message returned by the server.
     *
     * @returns The response code (i.e. 200).
     * @returns The response message (i.e. "OK").
     * @changed 1.80pr1.13 Added response message return value.
     */
    response(): LuaMultiReturn<[number, string]>;

    /**
     * Get a table containing the response's headers, in a format similar to that required by
     * {@link http.request}. If multiple headers are sent with the same name, they will be combined
     * with a comma.
     *
     * @returns The response's headers.
     * @example
     *     // Make a request to https://example.tweaked.cc, and print the returned headers.
     *     let request = http.get("https://example.tweaked.cc");
     *     print(textutils.serialize(request.getResponseHeaders()));
     *     // => {
     *     //  [ "Content-Type" ] = "text/plain; charset=utf8",
     *     //  [ "content-length" ] = 17,
     *     //  ...
     *     // }
     *     request.close();
     */
    getResponseHeaders(): HTTPHeaders;
}

declare type ResponseOrFail =
    | LuaMultiReturn<[Response, undefined, undefined]>
    | LuaMultiReturn<[undefined, string, Response | undefined]>;

/**
 * A websocket, which can be used to send an receive messages with a web server.
 *
 * @see {@link http.websocket} On how to open a websocket.
 */
declare interface WebSocket {
    /**
     * Wait for a message from the server.
     *
     * @param [timeout] The number of seconds to wait if no message is received.
     * @throws If the websocket has been closed.
     * @returns The received message or `undefined` if the websocket was closed while waiting, or if
     *          we timed out.
     * @returns If this was a binary message.
     * @changed 1.80pr1.13 Added return value indicating whether the message was binary.
     * @changed 1.87.0 Added timeout argument.
     */
    receive(
        timeout?: number
    ):
        | LuaMultiReturn<[string, boolean]>
        | LuaMultiReturn<[undefined, undefined]>;

    /**
     * Send a websocket message to the connected server.
     *
     * @param message The message to send.
     * @param [binary] Whether this message should be treated as a binary message.
     * @throws If the message is too large.
     * @throws If the websocket has been closed.
     * @changed 1.81.0 Added argument for binary mode.
     */
    send(message: string, binary?: boolean): void;

    /**
     * Close this websocket. This will terminate the connection, meaning messages can no longer be
     * sent or received along it.
     */
    close(): void;
}
