import * as tf from "@tensorflow/tfjs";

export async function loadModel() {
  try {
    const model = await tf.loadLayersModel(
      "/src/predict-ratings-model/model.json"
    );
    console.log("Model loaded successfully:", model);
    return model;
  } catch (error) {
    console.error("Error loading model:", error);
  }
}
