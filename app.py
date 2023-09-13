import csv


class WordGuesser:
    def __init__(self, csv_file):
        self.possible_words = []
        self.word_length = 0
        self.all_words = self.load_words_from_csv(csv_file)

    def load_words_from_csv(self, csv_file):
        with open(csv_file, 'r') as file:
            reader = csv.DictReader(file)
            return [row['word'].lower() for row in reader]

    def get_word_length(self):
        try:
            self.word_length = int(
                input("How many characters (including spaces)? "))
            self.possible_words = [
                word for word in self.all_words if len(word) == self.word_length]
        except ValueError:
            print("Please enter a valid number.")
            self.get_word_length()

    def filter_words(self, pattern):
        pattern = pattern.lower()
        new_possible_words = []
        for word in self.possible_words:
            if all(word[i] == pattern[i] or pattern[i] in ['_', ' '] for i in range(self.word_length)):
                new_possible_words.append(word)
        self.possible_words = new_possible_words

    def start(self):
        while True:
            self.get_word_length()
            while True:
                pattern = input(
                    "\nEnter the known letters and spaces (or type 'reset' to start over): ")
                if pattern == "reset":
                    break
                if len(pattern) != self.word_length:
                    print(f"Please enter a word of length {self.word_length}.")
                    continue
                self.filter_words(pattern)
                if not self.possible_words:
                    print("No possible combinations available.")
                    break
                print("\n".join(self.possible_words))


if __name__ == "__main__":
    csv_file = "words.csv"  # Change this to the path of your CSV file if it's different
    guesser = WordGuesser(csv_file)
    guesser.start()
