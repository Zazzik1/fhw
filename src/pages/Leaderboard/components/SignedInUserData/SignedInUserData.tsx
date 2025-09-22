import DisplayNameForm from "@/components/DisplayNameForm/DisplayNameForm";
import { Link } from "react-router-dom";

interface SignedInUserDataProps {
  userDisplayName: string;
  userScore: number;
  fetchStatus: "loading" | "success" | "error" | "not signed in";
  refreshData: () => Promise<void>;
}

function SignedInUserData({
  userDisplayName,
  userScore,
  fetchStatus,
  refreshData,
}: SignedInUserDataProps) {
  if (fetchStatus === "not signed in") {
    return (
      <p className="text-primary">zaloguj się żeby dołączyć do leaderboard</p>
    );
  }

  if (fetchStatus === "loading") {
    return <p className="text-primary">loading...</p>;
  }

  if (fetchStatus === "error") {
    return <p className="text-primary">coś poszło nie tak :(</p>;
  }

  if (userDisplayName == null) {
    return <DisplayNameForm refreshData={refreshData} />;
  }

  return (
    <div>
      <p className="text-primary">twoja nazwa: {userDisplayName}</p>
      <p className="text-primary">twój wynik: {userScore}</p>
      <p className="text-primary">
        <Link to="/upgrade">→ ulepsz konia ←</Link>
      </p>
    </div>
  );
}

export default SignedInUserData;
