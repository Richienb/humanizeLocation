/**
 * @license
 *
 * MIT License
 *
 * Copyright (c) 2019 Richie Bendall
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import axios from 'axios';
import * as Promise from 'bluebird';

/**
 * Humanize a set of coordinated
 * @method
 * @param {string|number} latitude - The latitude of the location, encoded as a string or a number
 * @param {string|number} longtitude - The longtitude the of the location, encoded as a string or a number
 * @param {Array<string>|boolean} [format=true] - The formatting options. If set to true, will auto format. If false, will return an Object of values. If array provided, will return parsed version of object.
 * @return {Promise<string | {}>} The address or an Object of address parameters
 */
export function humanizeLocation(latitude: string | number, longtitude: string | number, format: Array<string> | boolean = true): Promise<string | {}> {
    return new Promise((resolve, reject) => {
        axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
                format: "json",
                lat: latitude,
                lon: longtitude
            }
        })
            .then(res => {
                const data = res.data
                if (format === true) resolve(data.display_name)
                if (format === false) resolve(data.address)
                if (typeof format === "object") resolve(format.map(i => data.address[i]).join(", "))
            })
            .catch(err => reject(err))
    })
}
