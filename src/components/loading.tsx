import CustomImage from "@/components/image";

export default function Loading() {
  const loadingStyle = {
    display: "inline-block",
    marginRight: "0.5rem",
    borderRadius: "9999px",
    animation: "pulse 1.2s infinite ease-in-out",
  };
  return (
    <div className="fixed inset-0 bg-blue-950 flex items-center justify-center z-52">
      {/* Loading dots container */}
      <CustomImage
        src="/images/logo.jpg"
        alt="Background"
        width={150}
        height={150}
        className="rounded-full fade-in"
        style={{ ...loadingStyle, animationDelay: "0.6s" }}
      />
    </div>
  );
}
