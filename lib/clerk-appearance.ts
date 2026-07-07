// lib/clerk-appearance.ts
import type { Appearance } from "@clerk/types";

export const clerkAppearance: Appearance = {
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
        headerTitle: {
            color: "#f5f0e8",
            fontWeight: 600,
        },
        headerSubtitle: {
            color: "#867d66",
        },
        socialButtonsBlockButton:
            "border border-border bg-accent hover:bg-accent/70 transition-colors",
        socialButtonsBlockButtonText: {
            color: "#e49e22",
            fontWeight: 500,
        },
        dividerLine: "bg-border",
        dividerText: {
            color: "#867d66",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
        },
        formFieldLabel: {
            color: "#867d66",
            fontSize: "0.75rem",
        },
        formFieldInput:
            "bg-input border border-border text-foreground rounded-md focus:border-primary focus:ring-1 focus:ring-ring",
        formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-none normal-case text-sm",
        footer: "bg-card",
        footerActionText: {
            color: "#867d66",
        },
        footerActionLink: {
            color: "#e49e22",
        },
        identityPreviewText: {
            color: "#867d66",
        },
        identityPreviewEditButtonIcon: {
            color: "#e49e22",
        },
        formResendCodeLink: {
            color: "#e49e22",
        },
        otpCodeFieldInput: "border-border bg-input text-foreground",

        userButtonPopoverCard:
            "bg-card border border-border shadow-2xl shadow-black/40",
        userButtonPopoverActionButton: "hover:bg-accent/70 transition-colors",
        userButtonPopoverActionButtonText: {
            color: "#f5f0e8",
            fontWeight: 500,
        },
        userButtonPopoverActionButtonIcon: {
            color: "#e49e22",
        },
        userButtonPopoverFooter: "hidden",
        userPreviewMainIdentifier: {
            color: "#f5f0e8",
            fontWeight: 600,
        },
        userPreviewSecondaryIdentifier: {
            color: "#867d66",
        },
        userButtonAvatarBox: "w-9 h-9",
    },
};
