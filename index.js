class Elevator {
	constructor({ maxWeight, maxPeopleAllowed, maxFloors }) {
		this.peopleInLine = [];
		this.peopleInElevator = [];
		this.maxWeight = maxWeight;
		this.maxPeopleAllowed = maxPeopleAllowed;
		this.maxFloors = maxFloors;
	}
	addPersonInLine(persons) {
		persons.forEach(person => {
			if ((person.floor > this.maxFloors) || (person.weight > this.maxWeight)) {
				throw new Error('elevator limit exceeded');
			}
			this.peopleInLine.push(person);
		})
	}
	canAnotherPassengerBeOnboarded() {
		let weightOfElevator = this.peopleInElevator
			.reduce((a, b) => a + (b['weight'] || 0), 0);

		let weightOfPersonNextInLine = !this.isEmpty() ?
			this.peopleInLine[0]['weight'] : undefined;

		// console.log(this.maxWeight, this.maxPeopleAllowed, this.peopleInLine.length)
		return !this.isEmpty() &&
			this.maxWeight > (weightOfElevator + weightOfPersonNextInLine) &&
			(this.maxPeopleAllowed > this.peopleInElevator.length);
	}
	isEmpty() {
		return this.peopleInLine.length == 0;
	}
	numberOfStops() {
		let stops = 0;
		// console.log('this.canAnotherPassengerBeOnboarded()', this.canAnotherPassengerBeOnboarded());
		while (!this.isEmpty()) {
			while (this.canAnotherPassengerBeOnboarded()) {
				this.peopleInElevator.push(this.peopleInLine.shift());
			}
			stops += [...new Set(this.peopleInElevator.map(item => item.floor))].length;
			this.peopleInElevator = [];
			stops++;
		}
		return stops;
	}
}

const elevator1 = {
	maxWeight: 400,
	maxPeopleAllowed: 2,
	maxFloors: 6
};
const line1 = [
	{ weight: 150, floor: 2, },
	{ weight: 200, floor: 3, },
	{ weight: 120, floor: 5, },
	{ weight: 80, floor: 2, },
	{ weight: 180, floor: 4, },
	{ weight: 170, floor: 4, }
];

let elevatorObject1 = new Elevator(elevator1);
elevatorObject1.addPersonInLine(line1);
let stops1 = elevatorObject1.numberOfStops();
console.log(stops1);

const elevator2 = {
	maxWeight: 600,
	maxPeopleAllowed: 4,
	maxFloors: 7
};

const line2 = [
	{ weight: 100, floor: 6, },
	{ weight: 300, floor: 2, },
	{ weight: 80, floor: 2, },
	{ weight: 100, floor: 5, },

	{ weight: 120, floor: 3, },
	{ weight: 160, floor: 4, },
	{ weight: 120, floor: 6, },

	{ weight: 250, floor: 2, },
	{ weight: 180, floor: 5, },
	{ weight: 120, floor: 4, }
];

let elevatorObject2 = new Elevator(elevator2);
elevatorObject2.addPersonInLine(line2);
let stops2 = elevatorObject2.numberOfStops();
console.log(stops2);

//Assumptions - Elevator starting from Ground floor.

//Stops for case 1 -> 2, 3, ground, 5, 2, ground, 4, ground
//Stops for case 2 -> 6, 2, 5, ground, 3, 4, 6, ground, 2, 5, 4, ground
