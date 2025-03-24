export const calculatePoints = (difficulty) => {
    switch (difficulty) {
        case 'Easy':
            return 5;
        case 'Medium':
            return 10;
        case 'Hard': 
            return 15;

        default:
            return 0;
    }
}