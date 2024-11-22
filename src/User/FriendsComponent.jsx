
export default function FriendsComponent({ friends, handleRemoveFriend }) {
    return (
        
            <ul>
                {friends.map((friend) => (
                    <li key={friend.Id}>
                        {friend.Name}
                        <button
                            onClick={() => {
                                handleRemoveFriend(friend.Id);
                            }}
                        >
                            Remove Friend
                        </button>
                    </li>
                ))}
            </ul>
    );
}
