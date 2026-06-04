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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
    Award,
    BarChart3,
    BookOpen,
    FileText,
    ImageIcon,
    Plus,
    Sparkles,
    Target,
    Trash2,
    Upload,
    Video,
    X,
} from "lucide-react";

import { useObjectives } from "../../hooks/useObjetives";

export default function Sectiondetails() {
    const { addObjective, removeObjective, objectives, setObjectives } =
        useObjectives();

    return (
        <>
            <TabsContent value="details" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Learning Objectives */}
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-foreground">
                                <Target className="h-5 w-5 text-accent" />
                                Objetivos de Aprendizaje
                            </CardTitle>
                            <CardDescription>
                                ¿Qué aprenderán los estudiantes?
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {objectives.map((objective, index) => (
                                <div
                                    key={objective.id}
                                    className="flex items-center gap-2"
                                >
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-medium">
                                        {index + 1}
                                    </div>
                                    <Input
                                        value={objective.text}
                                        onChange={(e) =>
                                            setObjectives(
                                                objectives.map((o) =>
                                                    o.id === objective.id
                                                        ? {
                                                              ...o,
                                                              text: e.target
                                                                  .value,
                                                          }
                                                        : o,
                                                ),
                                            )
                                        }
                                        placeholder="Ej: Dominar los hooks de React"
                                        className="flex-1 bg-input border-border/50"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="shrink-0 text-muted-foreground hover:text-destructive"
                                        onClick={() =>
                                            removeObjective(objective.id)
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-2 gap-2 border-dashed"
                                onClick={addObjective}
                            >
                                <Plus className="h-4 w-4" />
                                Añadir Objetivo
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Materials Included */}
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-foreground">
                                <FileText className="h-5 w-5 text-emerald-400" />
                                Materiales Incluidos
                            </CardTitle>
                            <CardDescription>
                                Recursos adicionales para los estudiantes
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    {
                                        icon: Video,
                                        label: "Horas de video",
                                        value: "12+",
                                    },
                                    {
                                        icon: FileText,
                                        label: "Artículos",
                                        value: "25",
                                    },
                                    {
                                        icon: BookOpen,
                                        label: "Ejercicios",
                                        value: "50+",
                                    },
                                    {
                                        icon: Award,
                                        label: "Proyectos",
                                        value: "5",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30"
                                    >
                                        <item.icon className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="text-sm font-medium text-foreground">
                                                {item.value}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {item.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </>
    );
}
