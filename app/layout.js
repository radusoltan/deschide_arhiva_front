import "./globals.css";
import i18nConfig from "@/i18nConfig";

export const metadata = {
  title: "Arhiva Deschide.MD",
  description: "Rămâi la curent cu Deschide, cel mai important portal de știri din Moldova. Oferim știri de ultimă oră, analize și reportaje din politică, afaceri și multe altele. Citește acum!",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({ children, params: {locale} }) {
  return (
    <html lang={locale} className="h-full bg-gray-100">
    <body className="h-full">{children}</body>
    </html>
  );
}
