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
import { animeDatabase } from "@/data/animeData";

const AgeSearch = () => {
  const navigate = useNavigate();
  const [fromAge, setFromAge] = useState<string>("");
  const [toAge, setToAge] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  const ageRatings = ["0+", "6+", "12+", "16+", "18+"];

  const getAgeNumber = (rating: string) => {
    return parseInt(rating.replace("+", ""));
  };

  const handleSearch = () => {
    if (!fromAge || !toAge) return;

    const fromAgeNum = getAgeNumber(fromAge);
    const toAgeNum = getAgeNumber(toAge);

    const filtered = animeDatabase.filter((anime) => {
      const animeAge = getAgeNumber(anime.ageRating);
      return animeAge >= fromAgeNum && animeAge <= toAgeNum;
    });

    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20 mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-4xl font-bold mb-2">🔍 Поиск по возрасту</h1>
          <p className="text-lg opacity-90">
            Найдите аниме по возрастному рейтингу
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle>Параметры поиска</CardTitle>
            <CardDescription>
              Выберите диапазон возрастного рейтинга
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Возраст от:</label>
                <Select value={fromAge} onValueChange={setFromAge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите возраст" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRatings.map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Возраст до:</label>
                <Select value={toAge} onValueChange={setToAge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите возраст" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRatings.map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={handleSearch}
              disabled={!fromAge || !toAge}
              className="w-full"
            >
              <Icon name="Search" size={20} className="mr-2" />
              Найти аниме
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Найдено {results.length} аниме
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((anime) => (
                <Card
                  key={anime.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {anime.ageRating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ⭐ {anime.rating}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {anime.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {anime.year} • {anime.episodes} эп.
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {anime.description}
                    </p>
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

export default AgeSearch;
