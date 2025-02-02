const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

class Card {
	/* Regex patterns for MasterCard, Visa, Expiry Date and CVV
	 *
	 * 5355555555554444 => valid test Mastercard test number
	 * 5355 5555 5555 4444 => valid test Mastercard test number
	 * 4111111111111111 => valit test Visa card number
	 * 4111 1111 1111 1111 => valit test Visa card number
	 * 5060 5555 5555 5555 888 => valid Verve test card number
	 * 5061 5555 5555 5555 => valid Verve test card number
	 * 5080555555555555 => valid Verve test card number
	 * 5061555555555555888 => valid Verve test card number
	 *
	 */
	masterCardRegex = /^(5[1-5][0-9]{2}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4})$/;
	visaCardRegex = /^(4[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4})$/;
	expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
	cvvRegex = /^[0-9]{3}$/;
	test = 0;
	constructor(number, expiration, cvv) {
		if (new.target === Card) {
			throw new Error("Cannot instantiate an abstract class");
		}
		this.number = number;
		this.expiration = expiration;
		this.cvv = cvv;
	}

	verifyCVV() {
		this.test++;
		return this.cvvRegex.test(this.cvv);
	}

	getFormattedExpirationDate() {
		const [month, year] = this.expiration.split("/");
		return new Date(`20${year}`, month - 1);
	}

	verifyExpiryDate() {
		this.test++;
		if (!this.expiryDateRegex.test(this.expiration)) {
			return false;
		}
		const card_expiration_date = this.getFormattedExpirationDate();
		const current_date = new Date();
		return current_date < card_expiration_date;
	}

	printValidationResult() {
		throw new Error("Not implemented");
	}
}

class CreditCard extends Card {
	constructor(number, expiration, cvv) {
		super(number, expiration, cvv);
		this.type = this.#verifyCardNumber();
	}

	#verifyCardNumber() {
		this.test++;
		if (this.masterCardRegex.test(this.number)) {
			return "Mastercard";
		} else if (this.visaCardRegex.test(this.number)) {
			return "Visa";
		} else {
			return null;
		}
	}

	printValidationResult() {
		const totalTest = 3;
		const isCVVValid = this.verifyCVV();
		const isExpiryDateValid = this.verifyExpiryDate();
		let passedTest = this.test;

		if (this.type !== null && isCVVValid && isExpiryDateValid) {
			console.log(
				`
                Card type: ${this.type}
                Card number: ${this.number}
                Expiration: ${this.getFormattedExpirationDate().toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
									}
								)}
                CVV: ${this.cvv}
                All ${this.test} validation test passed. Credit Card is valid`
			);
		} else {
			if (this.type === null) {
				console.log("Invalid card number");
				passedTest--;
			}

			if (!isExpiryDateValid) {
				console.log("Invalid Expiration date");
				passedTest--;
			}

			if (!isCVVValid) {
				console.log("invalid CVV number");
				passedTest--;
			}
			console.log(
				`Credit Card is invalid. Only ${passedTest} out of ${totalTest} validation passed`
			);
		}
	}
}

class DebitCard extends Card {
	// Regex patterns for Verve Debit Cards
	#verveCardRegex =
		/^(5061|6500|5078|5079|5080)\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}(?:\s?[0-9]{3})?$/;

	constructor(number, expiration, cvv) {
		super(number, expiration, cvv);
		this.type = this.#verifyCardNumber();
	}

	#verifyCardNumber() {
		this.test++;
		if (this.masterCardRegex.test(this.number)) {
			return "Mastercard";
		} else if (this.visaCardRegex.test(this.number)) {
			return "Visa";
		} else if (this.#verveCardRegex.test(this.number)) {
			return "Verve";
		} else {
			return null;
		}
	}

	printValidationResult() {
		const totalTest = 3;
		const isCVVValid = this.verifyCVV();
		const isExpiryDateValid = this.verifyExpiryDate();
		let passedTest = this.test;

		if (this.type !== null && isCVVValid && isExpiryDateValid) {
			console.log(
				`
                Card type: ${this.type}
                Card number: ${this.number}
                Expiration: ${this.getFormattedExpirationDate().toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
									}
								)}
                CVV: ${this.cvv}
                All ${this.test} validation test passed. Debit Card is valid`
			);
		} else {
			if (this.type === null) {
				console.log("Invalid card number");
				passedTest--;
			}

			if (!isExpiryDateValid) {
				console.log("Invalid Expiration date");
				passedTest--;
			}

			if (!isCVVValid) {
				console.log("invalid CVV number");
				passedTest--;
			}
			console.log(
				`Debit Card is invalid. Only ${passedTest} out of ${totalTest} validation passed`
			);
		}
	}
}

class Question {
	askQuestion(question) {
		return new Promise((resolve) => {
			rl.question(question, (answer) => {
				resolve(answer.trim());
			});
		});
	}

	askList(question, choices) {
		return new Promise((resolve) => {
			console.log(question);
			choices.forEach((choice, index) => {
				console.log(`${index + 1}. ${choice}`);
			});
			rl.question("Choose an option: ", (answer) => {
				const index = parseInt(answer.trim()) - 1;
				if (index >= 0 && index < choices.length) {
					resolve(choices[index]);
				} else {
					resolve(null);
				}
			});
		});
	}
}

async function prompt(question) {
	const number = await question.askQuestion("Enter card number: ");
	const expiration_month = await question.askQuestion(
		"Enter expiration month(MM): "
	);
	const expiration_year = await question.askQuestion(
		"Enter expiration year(YY): "
	);
	const expiration = `${expiration_month}/${expiration_year}`;
	const cvv = await question.askQuestion("Enter CVV: ");

	return { number, expiration, cvv };
}

async function main() {
	let card;
	let number, expiration, cvv;

	const question = new Question();
	const cardType = await question.askList(
		"\nWelcome, Card Verification App for\nMaster Card, Visa card and Verve Card\nChoose a card type",
		["Debit card", "Credit Card", "Exit"]
	);

	switch (cardType) {
		case "Debit card":
			({ number, expiration, cvv } = await prompt(question));
			card = new DebitCard(number, expiration, cvv);
			card.printValidationResult();
			break;

		case "Credit Card":
			({ number, expiration, cvv } = await prompt(question));
			card = new CreditCard(number, expiration, cvv);
			card.printValidationResult();
			break;
		case "Exit":
			rl.close();
			process.exit();
		default:
			console.log("Invalid option. Please try again");
			main();
	}
	main();
}

main();
