import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import {
  animeDatabase,
  studios,
  type Anime,
  type Studio,
} from "@/data/animeData";
import { useNavigate } from "react-router-dom";

const DataManagement = () => {
  const navigate = useNavigate();
  const [animeList, setAnimeList] = useState<Anime[]>(animeDatabase);
  const [studiosList, setStudiosList] = useState<Studio[]>(studios);

  const [newAnime, setNewAnime] = useState({
    title: "",
    originalTitle: "",
    description: "",
    year: "",
    episodes: "",
    studioId: "",
    originalLanguage: "",
    ageRating: "",
    voiceStudioId: "",
    rating: "",
    awardId: "",
  });

  const [newStudio, setNewStudio] = useState({
    name: "",
    description: "",
    location: "",
    foundingYear: "",
    type: "animation" as const,
  });

  const handleAddAnime = (e: React.FormEvent) => {
    e.preventDefault();

    const anime: Anime = {
      id: Math.max(...animeList.map((a) => a.id), 0) + 1,
      title: newAnime.title,
      originalTitle: newAnime.originalTitle,
      description: newAnime.description,
      year: parseInt(newAnime.year),
      episodes: parseInt(newAnime.episodes),
      studioId: parseInt(newAnime.studioId),
      originalLanguage: newAnime.originalLanguage,
      ageRating: newAnime.ageRating,
      voiceStudioId: parseInt(newAnime.voiceStudioId),
      rating: parseFloat(newAnime.rating),
      awardId: parseInt(newAnime.awardId) || 0,
    };

    setAnimeList([...animeList, anime]);
    setNewAnime({
      title: "",
      originalTitle: "",
      description: "",
      year: "",
      episodes: "",
      studioId: "",
      originalLanguage: "",
      ageRating: "",
      voiceStudioId: "",
      rating: "",
      awardId: "",
    });
  };

  const handleAddStudio = (e: React.FormEvent) => {
    e.preventDefault();

    const studio: Studio = {
      id: Math.max(...studiosList.map((s) => s.id), 0) + 1,
      name: newStudio.name,
      description: newStudio.description,
      location: newStudio.location,
      foundingYear: parseInt(newStudio.foundingYear),
      type: newStudio.type,
    };

    setStudiosList([...studiosList, studio]);
    setNewStudio({
      name: "",
      description: "",
      location: "",
      foundingYear: "",
      type: "animation",
    });
  };

  const handleDeleteAnime = (id: number) => {
    setAnimeList(animeList.filter((anime) => anime.id !== id));
  };

  const handleDeleteStudio = (id: number) => {
    setStudiosList(studiosList.filter((studio) => studio.id !== id));
  };

  const animationStudios = studiosList.filter((s) => s.type === "animation");
  const voiceStudios = studiosList.filter((s) => s.type === "voice");

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-white hover:bg-white/20"
          >
            <Icon name="ArrowLeft" size={20} />
            Назад
          </Button>
          <h1 className="text-4xl font-bold mb-2">Управление данными</h1>
          <p className="text-xl opacity-90">
            Добавление, редактирование и удаление аниме и студий
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="anime" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="anime">Аниме</TabsTrigger>
            <TabsTrigger value="studios">Студии</TabsTrigger>
          </TabsList>

          <TabsContent value="anime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить новое аниме</CardTitle>
                <CardDescription>
                  Заполните информацию о новом аниме
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Название</Label>
                    <Input
                      id="title"
                      value={newAnime.title}
                      onChange={(e) =>
                        setNewAnime({ ...newAnime, title: e.target.value })
                      }
                      placeholder="Введите название"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalTitle">Оригинальное название</Label>
                    <Input
                      id="originalTitle"
                      value={newAnime.originalTitle}
                      onChange={(e) =>
                        setNewAnime({
                          ...newAnime,
                          originalTitle: e.target.value,
                        })
                      }
                      placeholder="Введите оригинальное название"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Год выпуска</Label>
                    <Input
                      id="year"
                      type="number"
                      value={newAnime.year}
                      onChange={(e) =>
                        setNewAnime({ ...newAnime, year: e.target.value })
                      }
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="episodes">Количество эпизодов</Label>
                    <Input
                      id="episodes"
                      type="number"
                      value={newAnime.episodes}
                      onChange={(e) =>
                        setNewAnime({ ...newAnime, episodes: e.target.value })
                      }
                      placeholder="24"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ageRating">Возрастной рейтинг</Label>
                    <Select
                      value={newAnime.ageRating}
                      onValueChange={(value) =>
                        setNewAnime({ ...newAnime, ageRating: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите рейтинг" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0+">0+</SelectItem>
                        <SelectItem value="6+">6+</SelectItem>
                        <SelectItem value="12+">12+</SelectItem>
                        <SelectItem value="16+">16+</SelectItem>
                        <SelectItem value="18+">18+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rating">Рейтинг</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={newAnime.rating}
                      onChange={(e) =>
                        setNewAnime({ ...newAnime, rating: e.target.value })
                      }
                      placeholder="8.5"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={newAnime.description}
                    onChange={(e) =>
                      setNewAnime({ ...newAnime, description: e.target.value })
                    }
                    placeholder="Введите описание аниме"
                  />
                </div>
                <Button onClick={handleAddAnime} className="w-full">
                  <Icon name="Plus" size={20} />
                  Добавить аниме
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Список аниме ({animeList.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {animeList.slice(0, 10).map((anime) => (
                    <div
                      key={anime.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{anime.title}</h3>
                        <p className="text-sm text-gray-600">
                          {anime.year} • {anime.episodes} эп. •{" "}
                          {anime.ageRating}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteAnime(anime.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="studios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить новую студию</CardTitle>
                <CardDescription>
                  Заполните информацию о новой студии
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studioName">Название студии</Label>
                    <Input
                      id="studioName"
                      value={newStudio.name}
                      onChange={(e) =>
                        setNewStudio({ ...newStudio, name: e.target.value })
                      }
                      placeholder="Введите название студии"
                    />
                  </div>
                  <div>
                    <Label htmlFor="studioType">Тип студии</Label>
                    <Select
                      value={newStudio.type}
                      onValueChange={(value) =>
                        setNewStudio({ ...newStudio, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="animation">Анимационная</SelectItem>
                        <SelectItem value="voice">Озвучки</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Местоположение</Label>
                    <Input
                      id="location"
                      value={newStudio.location}
                      onChange={(e) =>
                        setNewStudio({ ...newStudio, location: e.target.value })
                      }
                      placeholder="Токио, Япония"
                    />
                  </div>
                  <div>
                    <Label htmlFor="foundingYear">Год основания</Label>
                    <Input
                      id="foundingYear"
                      type="number"
                      value={newStudio.foundingYear}
                      onChange={(e) =>
                        setNewStudio({
                          ...newStudio,
                          foundingYear: e.target.value,
                        })
                      }
                      placeholder="1985"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="studioDescription">Описание</Label>
                  <Textarea
                    id="studioDescription"
                    value={newStudio.description}
                    onChange={(e) =>
                      setNewStudio({
                        ...newStudio,
                        description: e.target.value,
                      })
                    }
                    placeholder="Введите описание студии"
                  />
                </div>
                <Button onClick={handleAddStudio} className="w-full">
                  <Icon name="Plus" size={20} />
                  Добавить студию
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Анимационные студии ({animationStudios.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {animationStudios.slice(0, 5).map((studio) => (
                      <div
                        key={studio.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{studio.name}</h4>
                          <p className="text-sm text-gray-600">
                            {studio.location} • {studio.foundingYear}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteStudio(studio.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Студии озвучки ({voiceStudios.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {voiceStudios.slice(0, 5).map((studio) => (
                      <div
                        key={studio.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{studio.name}</h4>
                          <p className="text-sm text-gray-600">
                            {studio.location} • {studio.foundingYear}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteStudio(studio.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataManagement;
