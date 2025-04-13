import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <Avatar className="mb-4 h-24 w-24">
        <AvatarImage src="https://picsum.photos/200/200" alt="Profile Picture" />
        <AvatarFallback>FG</AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <p className="text-lg">
          <span className="font-semibold">Name:</span> John Doe
        </p>
        <p className="text-lg">
          <span className="font-semibold">Age:</span> 25
        </p>
        <p className="text-lg">
          <span className="font-semibold">Gender:</span> Male
        </p>
        <p className="text-lg">
          <span className="font-semibold">Achievements:</span> 10
        </p>
        <p className="text-lg">
          <span className="font-semibold">Points:</span> 1500
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
