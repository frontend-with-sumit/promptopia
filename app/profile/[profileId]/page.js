"use client";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function UserProfile({ params }) {
	const searchParams = useSearchParams();
	const username = searchParams.get("name");
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params.profileId}/posts`);
			const data = await response.json();

			setPosts(data);
		};

		fetchPosts();
	}, []);

	return (
		<Profile
			name={username}
			desc={`Welcome to ${username} personalized profile page. Expolore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
			data={posts}
		/>
	);
}

export default UserProfile;
