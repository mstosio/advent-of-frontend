export class RateLimiter {
    maxRequests: number;
    intervalMs: number;
    attempts: number;
    timer: any;

    constructor(maxRequests: number, intervalMs: number) {
        this.maxRequests = maxRequests;
        this.intervalMs = intervalMs;
        this.attempts = 0;
        this.timer  = null
    }

    attemptAccess(){
        this.attempts += 1;

        if(this.attempts > this.maxRequests){
            return false
        }

        if(!this.timer){
            this.timer = setTimeout(() => {
                this.attempts = 0
            }, this.intervalMs)
        }
        return true
    }
}