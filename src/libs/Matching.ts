function matchUsers(users: Array<any>, userPreferences: any) {
    let matches = [];

    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            let user1 = users[i];
            let user2 = users[j];

            // Check if the users are within the preferred location distance
            let distance = getDistance(user1.location, user2.location);
            if (distance > userPreferences.locationRadius) {
                continue;
            }

            // Check if the users have common interests
            let commonInterests = getCommonInterests(
                user1.interests,
                user2.interests
            );
            if (commonInterests.length === 0) {
                continue;
            }

            // If both checks pass, add the users to the match list
            matches.push({
                user1: user1,
                user2: user2,
                commonInterests: commonInterests,
            });
        }
    }

    return matches;
}

function getDistance(location1: any, location2: any) {
    const EARTH_RADIUS = 6371; // Radius of the earth in kilometers

    let lat1 = location1.latitude;
    let lon1 = location1.longitude;
    let lat2 = location2.latitude;
    let lon2 = location2.longitude;

    let dLat = toRadians(lat2 - lat1);
    let dLon = toRadians(lon2 - lon1);

    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);

    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = EARTH_RADIUS * c;

    return d;
}

function toRadians(degree: any) {
    return degree * (Math.PI / 180);
}

function getCommonInterests(interests1: any, interests2: any) {
    let commonInterests = [];

    for (let i = 0; i < interests1.length; i++) {
        let interest = interests1[i];
        if (interests2.indexOf(interest) !== -1) {
            commonInterests.push(interest);
        }
    }

    return commonInterests;
}

let users = [
    {
        name: 'Jane Doe',
        location: { latitude: 37.7749, longitude: -122.4194 },
        interests: ['hiking', 'reading', 'traveling'],
    },
    {
        name: 'John Doe',
        location: {
            latitude: 37.788022,
            longitude: -122.399797,
        },
        interests: ['music', 'movies', 'traveling'],
    },
    {
        name: 'Jane Smith',
        location: {
            latitude: 37.7913,
            longitude: -122.3977,
        },
        interests: ['reading', 'cooking', 'yoga'],
    },
    {
        name: 'John Smith',
        location: {
            latitude: 37.7765,
            longitude: -122.418,
        },
        interests: ['hiking', 'reading', 'music'],
    },
];
let userPreferences = {
    locationRadius: 50,
    minCommonInterests: 2,
    interests: ['hiking', 'reading', 'music'],
};

console.log(matchUsers(users, userPreferences));
