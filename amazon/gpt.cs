using System.Collections;
using System.Collections.Generic; using UnityEngine; using UnityEngine.UI;
using OpenAI;
using OpenAI.Models;
using TMPro;
Unity Script | 0 references
public class ChatGPT: MonoBehaviour
{
[SerializeField] private Button button;
[SerializeField] private TMP_InputField inputField;
[SerializeField] private TMP_Text displayText;
private string userInput;
private string chatHistory;
private string aiIdentity = "Act as an teacher who is cool ";
private OpenAIClient api;
I
private void Start()
{
    chatHistory += aiIdentity + "\n";
api = new OpenAIClient(new OpenAIAuthentication(""));
button.onClick.AddListener(AskAI);
}
private async void AskAI()
{
button.enabled = false;
inputField.enabled = false;
userInput = inputField.text;
chatHistory += $"{userInput}.\n";
displayText.text = "....."
inputField.text = "....";
var result =  await api.CompletionsEndpoint.CreateCompletionAsync(chatHistory,maxTokens: 200 Model.Davinci);

displayText.text = result.ToString(); 
chatHistory += $" (result.ToString()}\n";

button.enabled = true;
inputField.enabled = true;
}
}