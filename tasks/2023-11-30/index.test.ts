import { znajdzSciezke } from './index';

describe('Labirynt Wiedzy', () => {
    it('Zwraca poprawną ścieżkę dla prostego labiryntu', () => {
        const labirynt = [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ];
        const oczekiwanaSciezka = [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2]];
        expect(znajdzSciezke(labirynt)).toEqual(oczekiwanaSciezka);
    });

    it('Zwraca pustą tablicę, gdy ścieżka nie istnieje', () => {
        const labirynt = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        expect(znajdzSciezke(labirynt)).toEqual([]);
    });

    it('Zwraca jedną z najkrótszych ścieżek dla złożonego labiryntu', () => {
        const labirynt = [
            [1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1],
            [1, 1, 1, 0, 1],
            [0, 1, 0, 0, 1],
            [0, 1, 1, 1, 1]
        ];
        const oczekiwanaSciezka = [
            [0, 0], [0, 1], [0, 2],
            [1, 2], [1, 3], [1, 4],
            [2, 4], [3, 4], [4, 4]
        ];
        expect(znajdzSciezke(labirynt)).toEqual(oczekiwanaSciezka);
    });
});