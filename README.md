# Text Classification with Hugging Face in Node.js

This project demonstrates how to perform text classification using Hugging Face's `transformers` library with Node.js. It sets up a simple pipeline to classify text based on sentiment (positive or negative) using the `distilbert-base-uncased-finetuned-sst-2-english` model from Hugging Face.

## Prerequisites

- Node.js (version 14 or higher)
- Internet connection to access the Hugging Face Model Hub

## Installation

1. Clone this repository to your local machine.
2. Install the required dependencies.

   ```bash
   npm install @huggingface/transformers
   ```

3. Ensure you have an environment that supports ES Modules, as this code uses `import()`.

## Usage

The main classification functionality is encapsulated in the `MyClassificationPipeline` class. This class leverages a singleton pattern to ensure that only one instance of the pipeline is created.

### Example Code

```javascript
class MyClassificationPipeline{
    static task = 'text-classification';
    static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';

    static instance = null;
    static async getInstance(progress_callback = null){
        if(this.instance === null){
            let {pipeline, env} = await import('@huggingface/transformers');

            this.instance = pipeline(this.task, this.model, {progress_callback});
        }
        return this.instance;
    }
}

(async () => {
    const classifier = await MyClassificationPipeline.getInstance();
    const response = await classifier('I am a human');
    console.log(response);
})();
```

### Explanation

- **MyClassificationPipeline**: A custom class that sets up a text classification pipeline using a pre-trained model from Hugging Face.  
  - `task`: Specifies the task as `text-classification`.
  - `model`: Defines the model to use, in this case, `distilbert-base-uncased-finetuned-sst-2-english`.
  - `getInstance()`: Uses a singleton pattern to load and return the pipeline instance. The `progress_callback` parameter allows optional tracking of the model download progress.
  
- **Example Execution**:
  - A sample text (`"I am a human"`) is classified, and the response is printed to the console.

### Expected Output

The output will be an array containing the classification label (e.g., `POSITIVE` or `NEGATIVE`) and a confidence score, like so:

```json
[
  { "label": "POSITIVE", "score": 0.999 }
]
```

## License

This project is licensed under the MIT License.

---