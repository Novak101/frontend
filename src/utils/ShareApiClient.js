import { API_URL } from '../Config'

// Minimal fetch wrapper for a filter's anonymous share link (eapi/v1/shared/:token/...).
// Deliberately NOT the apiClient singleton (see ApiClient.js): that client
// auto-retries on 401 with a token refresh and ultimately hard-navigates to
// /login on failure, which would hijack an embedded iframe on any transient
// error. This wrapper has no auth header, no retry, and no redirect logic -
// callers just check response.ok and show an inline error state.
const shareRequest = async (token, path, options = {}) => {
  return fetch(`${API_URL}/eapi/v1/shared/${token}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
}

export const GetSharedFilterTasks = token => shareRequest(token, '/tasks')

export const CompleteSharedTask = (token, choreId) =>
  shareRequest(token, `/tasks/${choreId}/complete`, { method: 'POST' })

export const CreateSharedTask = (token, { dueDate, name }) =>
  shareRequest(token, '/tasks', {
    method: 'POST',
    body: JSON.stringify({ name, dueDate }),
  })
