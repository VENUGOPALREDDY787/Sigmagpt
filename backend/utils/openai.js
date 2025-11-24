import "dotenv/config";

const getOpenAiApiResponce = async(message)=>{
    const options={
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body:JSON.stringify({
            model:"gpt-4o-mini",
            messages:[{
                role:"user",
                content: message
            }]
        })
    };
    
    try{
        const responce = await fetch("https://api.openai.com/v1/chat/completions",options);
        const data = await responce.json();
        // console.log(data);
        return (data.choices[0].messages.content);
    }catch(err){
        console.log(err);
    }

}
export default getOpenAiApiResponce;

