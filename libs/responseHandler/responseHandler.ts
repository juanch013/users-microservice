export default function handleRsponse(code:number,message:string,data:any){
    try {
        return {
            code,
            message,
            data
        }
    } catch (error) {
        console.log(error.message, error.stack,"context: handleRsponse")
    }
}