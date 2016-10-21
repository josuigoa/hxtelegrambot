package telegram.bot.types;

/**
	This object represents one button of the reply keyboard. For simple text buttons String can be used instead of this object to specify text of the button. Optional fields are mutually exclusive.
**/
typedef KeyboardButton = {
	/**
		Text of the button. If none of the optional fields are used, it will be sent to the bot as a message when the button is pressed
	**/
	var text : String;
	/**
		If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only
	**/
	@:optional
	var request_contact : Bool;
	/**
		If True, the user's current location will be sent when the button is pressed. Available in private chats only
	**/
	@:optional
	var request_location : Bool;
}