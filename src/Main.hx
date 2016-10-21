import telegram.types.Update;
import telegram.BotApi;

class Main {
    static function main() {
        var token = Sys.getEnv("BOT_TOKEN");
        if (token == null)
            token = sys.io.File.getContent("bottoken.txt");
        var api = new BotApi(new Connection(token));

        function onUpdate(update:Update) {
            if (update.message != null) {
                api.sendMessage({
                    text: 'Я тут',
                    reply_to_message_id: update.message.message_id,
                    chat_id: update.message.chat.id,
                });
            }
        }

        var listener = new WebhookUpdateListener(api, onUpdate, "");
        listener.stop(function() {
            new PollUpdateListener(api, onUpdate, 10).start();
        });


        // var server = js.node.Http.createServer(function(req, res) {
        //     req.on("data", function(data) {
        //         trace(data);
        //     });
        //     res.end("hi");
        // });

        // var port = Sys.getEnv("PORT");
        // var port = if (port == null) 80 else Std.parseInt(port);
        // server.listen(port);

        // listener.start(function() {

        // });
    }
}
