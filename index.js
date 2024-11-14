class MyClassificationPipeline{
    static task = 'text-classification';
    static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english'

    static instance = null;
    static async getInstance(progress_callback = null){
        if(this.instance === null){
            let {pipeline, env} = await import('@huggingface/transformers')

            this.instance = pipeline(this.task,this.model,{progress_callback})
        }
        return this.instance;
    }
}

(async()=>{
    const classifier = await MyClassificationPipeline.getInstance();
    response = await classifier('i am a human');
    console.log(response);
})()