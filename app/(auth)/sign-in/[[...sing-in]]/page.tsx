import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-4 py-12">
            {/* resplandor ámbar de fondo */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
            />

            {/* textura sutil de puntos */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,var(--primary-text)_1px,transparent_0)] [background-size:28px_28px]"
            />

            <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="h-px w-8 bg-primary/50" />
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Bienvenido de nuevo
                    </h1>
                    <p className="text-sm text-primary-text">
                        Inicia sesión para continuar
                    </p>
                </div>

                <SignIn
                    appearance={{
                        variables: {
                            colorPrimary: "#e49e22",
                            colorBackground: "#130f0b",
                            colorForeground: "#e49e22",
                            colorPrimaryForeground: "#1a1208",
                            colorMutedForeground: "#867d66",
                            colorMuted: "#1e1915",
                            colorInput: "#2a211b",
                            colorInputForeground: "#e49e22",
                            colorBorder: "#867d66",
                            colorRing: "#867d66",
                            colorDanger: "#dc2626",
                            borderRadius: "0.625rem",
                            fontFamily: "var(--font-sans)",
                        },
                        elements: {
                            rootBox: "w-full",
                            card: "w-full border border-border bg-card rounded-lg p-6 shadow-2xl shadow-black/40",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            socialButtonsBlockButton:
                                "border border-border bg-accent hover:bg-accent/70 transition-colors",
                            socialButtonsBlockButtonText: {
                                color: "#e49e22",
                                fontWeight: 500,
                            },
                            dividerLine: "bg-border",
                            dividerText:
                                "text-muted-foreground text-xs uppercase tracking-wide",
                            formFieldLabel: {
                                color: "#867d66",
                                fontSize: "0.75rem",
                            },
                            formFieldInput:
                                "bg-input border border-border text-foreground rounded-md focus:border-primary focus:ring-1 focus:ring-ring",
                            formButtonPrimary:
                                "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-none normal-case text-sm",
                            footer: "bg-card",
                            footerActionText: "text-primary-text",
                            footerActionLink:
                                "text-primary hover:text-primary/80",
                            identityPreviewText: "text-primary-text",
                            identityPreviewEditButtonIcon: "text-primary",
                            formResendCodeLink: "text-primary",
                            otpCodeFieldInput:
                                "border-border bg-input text-foreground",
                        },
                    }}
                />
            </div>
        </div>
    );
}
