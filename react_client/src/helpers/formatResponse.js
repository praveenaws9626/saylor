export function formatResponse(error, success) {
    if (!error) {
        return { success };
    } else {
        return { error };
    }
}