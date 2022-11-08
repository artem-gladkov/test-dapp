import axios from "axios";
import {getBaseBackendUrl} from "../config";

export const httpClient = axios.create({baseURL: getBaseBackendUrl()})
