function MealPlanner() {
	const height = '200px';
	const width = '200px';

	return (
		<ul>
			<li style={{ height: height, width: width, border: '1px solid black' }}>
				Sunday
			</li>
			<li style={{ height: height, width: width, border: '1px solid black' }}>
				Monday
			</li>
			<li style={{ height: height, width: width, border: '1px solid black' }}>
				Tuesday
			</li>
			<li style={{ height: height, width: width, border: '1px solid black' }}>
				Wednesday
			</li>
			<li style={{ height: height, width: width, border: '1px solid black' }}>
				Thursday
			</li>
			<li style={{ height: height, width: width, border: '1px solid black' }}>
				Friday
			</li>
			<li style={{ height: height, width: width, border: '1px solid black' }}>
				Saturday
			</li>
		</ul>
	);
}

export default MealPlanner;
