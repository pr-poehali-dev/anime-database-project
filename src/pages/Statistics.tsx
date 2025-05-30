import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { animeDatabase, studios } from "@/data/animeData";

const Statistics = () => {
  const navigate = useNavigate();

  // Подсчёт статистики
  const totalAnime = animeDatabase.length;
  const animationStudios = studios.filter((s) => s.type === "animation").length;
  const voiceStudios = studios.filter((s) => s.type === "voice").length;

  // Статистика по возрастным рейтингам
  const ageRatingStats = animeDatabase.reduce(
    (acc, anime) => {
      acc[anime.ageRating] = (acc[anime.ageRating] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Статистика по годам
  const yearStats = animeDatabase.reduce(
    (acc, anime) => {
      const decade = `${Math.floor(anime.year / 10) * 10}s`;
      acc[decade] = (acc[decade] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Средний рейтинг
  const averageRating = (
    animeDatabase.reduce((acc, anime) => acc + anime.rating, 0) / totalAnime
  ).toFixed(1);

  // Топ студии по количеству аниме
  const studioStats = animeDatabase.reduce(
    (acc, anime) => {
      const studio = studios.find((s) => s.id === anime.studioId);
      if (studio) {
        acc[studio.name] = (acc[studio.name] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const topStudios = Object.entries(studioStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-100">
      <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20 mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-4xl font-bold mb-2">📊 Статистика базы данных</h1>
          <p className="text-lg opacity-90">
            Динамическая статистика аниме каталога
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Основная статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {totalAnime}
              </div>
              <div className="text-gray-600">Всего аниме</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {animationStudios}
              </div>
              <div className="text-gray-600">Студий анимации</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {voiceStudios}
              </div>
              <div className="text-gray-600">Студий озвучки</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {averageRating}
              </div>
              <div className="text-gray-600">Средний рейтинг</div>
            </CardContent>
          </Card>
        </div>

        {/* Статистика по возрастным рейтингам */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Распределение по возрастным рейтингам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(ageRatingStats).map(([rating, count]) => (
                  <div
                    key={rating}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">{rating}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(count / totalAnime) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Топ студии */}
          <Card>
            <CardHeader>
              <CardTitle>Топ студии по количеству аниме</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topStudios.map(([studio, count], index) => (
                  <div
                    key={studio}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-gray-500 mr-3">
                        #{index + 1}
                      </span>
                      <span className="text-sm font-medium">{studio}</span>
                    </div>
                    <span className="text-sm text-gray-600">{count} аниме</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Статистика по десятилетиям */}
        <Card>
          <CardHeader>
            <CardTitle>Распределение аниме по десятилетиям</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(yearStats)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([decade, count]) => (
                  <div
                    key={decade}
                    className="text-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl font-bold text-gray-800">
                      {count}
                    </div>
                    <div className="text-sm text-gray-600">{decade}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
