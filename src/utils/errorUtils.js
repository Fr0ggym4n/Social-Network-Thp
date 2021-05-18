const errorMessages = (data) => 
    (data.message[0].messages.reduce((finalMessage, errorMessage) => finalMessage + errorMessage.message, ''));

export default errorMessages;