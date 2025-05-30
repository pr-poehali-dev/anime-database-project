import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useDataContext } from "@/contexts/DataContext";

const EpisodeSearch = () => {
  const navigate = useNavigate();
  const { animeList } = useDataContext();
  const [selectedEpisodes, setSelectedEpisodes] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [step, setStep] = useState<1 | 2>(1);

  // Получаем уникальные количества эпизодов
  const episodeCounts = Array.from(
    new Set(animeList.map((anime) => anime.episodes)),
  ).sort((a, b) => a - b);

  const handleEpisodeSelect = (episodes: string) => {
    setSelectedEpisodes(episodes);

    // Фильтруем годы для выбранного количества эпизодов
    const episodeNum = parseInt(episodes);
    const years = animeList
      .filter((anime) => anime.episodes === episodeNum)
      .map((anime) => anime.year);

    const uniqueYears = Array.from(new Set(years)).sort();
    setAvailableYears(uniqueYears);
    setStep(2);
  };

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);

    // Поиск по двум параметрам
    const episodeNum = parseInt(selectedEpisodes);
    const yearNum = parseInt(year);

    const filtered = animeList.filter(
      (anime) => anime.episodes === episodeNum && anime.year === yearNum,
    );

    setResults(filtered);
  };

  const resetSearch = () => {
    setSelectedEpisodes("");
    setSelectedYear("");
    setAvailableYears([]);
    setResults([]);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20 mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-4xl font-bold mb-2">📅 Поиск эпизодов по году</h1>
          <p className="text-lg opacity-90">
            Двухэтапный поиск по количеству серий и году выхода
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Шаг 1: Количество эпизодов</CardTitle>
                <CardDescription>
                  Выберите количество серий для поиска
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={selectedEpisodes}
                  onValueChange={handleEpisodeSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите количество эпизодов" />
                  </SelectTrigger>
                  <SelectContent>
                    {episodeCounts.map((count) => (
                      <SelectItem key={count} value={count.toString()}>
                        {count} эпизод
                        {count === 1 ? "" : count < 5 ? "а" : "ов"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Шаг 2: Год выхода</CardTitle>
                <CardDescription>
                  Выберите год для аниме с {selectedEpisodes} эпизодами
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedYear} onValueChange={handleYearSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите год" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={resetSearch}
                  className="w-full"
                >
                  <Icon name="RotateCcw" size={20} className="mr-2" />
                  Начать заново
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {results.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Результаты поиска
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((anime) => (
                <Card
                  key={anime.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {anime.episodes} эп.
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {anime.year}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {anime.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {anime.originalTitle}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {anime.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Рейтинг: ⭐ {anime.rating}</span>
                      <span>Возраст: {anime.ageRating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeSearch;
