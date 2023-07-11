"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

function Feed() {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();
			setPosts(data);
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		if (searchText) {
			const searchTerm = searchText.toLowerCase();
			const filteredPosts = posts.filter(
				(post) =>
					post.tag.toLowerCase().includes(searchTerm) ||
					post.prompt.toLowerCase().includes(searchTerm) ||
					post.creator.username.toLowerCase().includes(searchTerm)
			);
			setFilteredPosts(filteredPosts);
		} else {
			posts && setFilteredPosts(posts);
		}
	}, [searchText, posts]);

	const handleSearchChange = (e) => setSearchText(e.target.value);

	const handleTagClick = (tag) => setSearchText(tag.substring(1));

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{filteredPosts.length === 0 && (
				<p className="text-italic">No Prompts available</p>
			)}
			<PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
		</section>
	);
}

export default Feed;
