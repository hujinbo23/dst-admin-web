import { http } from "../utils/http";

async function createBackupApi() {
    const url = '/api/dashboard'
    const response = await http.get(url)
    return response.data
}

async function getBackupApi() {
    const url = '/api/game/backup'
    const response = await http.get(url)
    return response.data
}

export {
    createBackupApi,
    getBackupApi
}