import ProfileContent from "@/components/ui/profile-content";
import ProfileHeader from "@/components/ui/profile-header";
import { getCurrentUser } from "@/services/auth.service";


export default function Profile() {
    const user = getCurrentUser()
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <ProfileHeader user={user}/>
      <ProfileContent />
    </div>
  );
}