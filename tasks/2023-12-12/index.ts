const delay = (timeConstraint: number) => new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('Timeout'))
    }, timeConstraint)
})
export async function conductInterviews(
    subjects: string[],
    interview: (subject: string) => Promise<string>,
    timeConstraint: number
){
    const resolved = await Promise.all(subjects.map(subj => {
        const promises = Promise.race([interview(subj), delay(timeConstraint)])
        return promises.catch(e => e)
    }))

    return resolved.map(String)
}
