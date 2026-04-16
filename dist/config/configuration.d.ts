declare const _default: () => {
    app: {
        env: string;
        port: number;
        frontendUrl: string;
    };
    supabase: {
        url: string | undefined;
        serviceRoleKey: string | undefined;
    };
    telegram: {
        botToken: string | undefined;
        adminChatId: string | undefined;
    };
    payments: {
        stripeSecret: string | undefined;
        stripeWebhook: string | undefined;
        paystackSecret: string | undefined;
        paystackWebhook: string | undefined;
    };
    medusa: {
        baseUrl: string | undefined;
        apiKey: string | undefined;
    };
};
export default _default;
