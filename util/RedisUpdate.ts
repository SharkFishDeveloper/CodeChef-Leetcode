import axios from "axios";

export async function redisUpdateFunction(slug:string,elapsed:number) {
    try {
        await axios.post("/api/redis",{problemSlug:slug,timeTaken:elapsed})
    } catch (error) {
        console.log(error)
    }
}