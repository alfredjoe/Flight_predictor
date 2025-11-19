import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plane, Clock, MapPin, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FlightData {
  dayOfWeek: string;
  origin: string;
  dest: string;
  depDelay: string;
  day: string;
}

interface PredictionResult {
  predicted_delay: 'Delay' | 'No Delay';
}

const FlightPredictionForm = () => {
  const [formData, setFormData] = useState<FlightData>({
    dayOfWeek: '',
    origin: '',
    dest: '',
    depDelay: '',
    day: ''
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Your Render API URL
  const API_URL = 'https://flight-predictor-model-ro8r.onrender.com';

  const airports = [
    { code: 'ATL', name: 'Atlanta Hartsfield-Jackson' },
    { code: 'XNA', name: 'Northwest Arkansas Regional' },
    { code: 'DFW', name: 'Dallas/Fort Worth' },
    { code: 'ORD', name: "Chicago O'Hare" },
    { code: 'LAX', name: 'Los Angeles' },
    { code: 'DEN', name: 'Denver International' },
    { code: 'SEA', name: 'Seattle-Tacoma' },
    { code: 'PHX', name: 'Phoenix Sky Harbor' },
    { code: 'CLT', name: 'Charlotte Douglas' },
    { code: 'LAS', name: 'Las Vegas McCarran' }
  ];

  const daysOfWeek = [
    { value: '1', label: 'Sunday' },
    { value: '2', label: 'Monday' },
    { value: '3', label: 'Tuesday' },
    { value: '4', label: 'Wednesday' },
    { value: '5', label: 'Thursday' },
    { value: '6', label: 'Friday' },
    { value: '7', label: 'Saturday' }
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleInputChange = (field: keyof FlightData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (prediction) {
      setPrediction(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = Object.entries(formData);
    const emptyFields = requiredFields.filter(([_, value]) => !value);

    if (emptyFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get a prediction.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Show wake-up message for Render free tier
    toast({
      title: "⏳ Connecting to AI Model...",
      description: "First request may take 30-60 seconds as the server wakes up.",
    });

    const apiData = {
      DayOfWeek: parseInt(formData.dayOfWeek),
      Origin: formData.origin,
      Dest: formData.dest,
      DepDelay: parseFloat(formData.depDelay),
      Month: 3,
      Day: parseInt(formData.day)
    };

    try {
      const response = await fetch(`${API_URL}/predict/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      setPrediction(result);
      
      toast({
        title: "✈️ Prediction Complete!",
        description: `Flight status: ${result.predicted_delay}`,
      });
    } catch (error) {
      console.error('Prediction error:', error);
      
      let errorMessage = "Could not connect to the prediction service.";
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = `Cannot connect to the API. The server might be starting up. Please wait 60 seconds and try again.`;
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "❌ Prediction Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* API Status Indicator */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Connected to Render Cloud API</span>
        </div>
      </div>

      <Card className="relative bg-gradient-to-br from-card via-card to-card/90 rounded-3xl shadow-2xl border-2 border-primary/20 overflow-hidden group hover:border-primary/40 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>

        <CardHeader className="text-center relative z-10 pb-8">
          <CardTitle className="text-3xl lg:text-4xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <Plane className="w-10 h-10 text-primary animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-ping"></div>
            </div>
            Flight Delay Predictor AI
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced machine learning predictions for flight delays - March 2025
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Day of Week */}
              <div className="space-y-3 group">
                <Label className="text-foreground font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Day of Week
                </Label>
                <Select onValueChange={(value) => handleInputChange('dayOfWeek', value)}>
                  <SelectTrigger className="h-12 bg-background/80 border-2 border-border hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all duration-200 rounded-xl">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day.value} value={day.value}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Day of Month */}
              <div className="space-y-3 group">
                <Label className="text-foreground font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Day of Month (March)
                </Label>
                <Select onValueChange={(value) => handleInputChange('day', value)}>
                  <SelectTrigger className="h-12 bg-background/80 border-2 border-border hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all duration-200 rounded-xl">
                    <SelectValue placeholder="Select day (1-31)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        March {day}, 2025
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Origin Airport */}
              <div className="space-y-3 group">
                <Label className="text-foreground font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Origin Airport
                </Label>
                <Select onValueChange={(value) => handleInputChange('origin', value)}>
                  <SelectTrigger className="h-12 bg-background/80 border-2 border-border hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all duration-200 rounded-xl">
                    <SelectValue placeholder="Departure airport" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-primary">{airport.code}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm">{airport.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Destination Airport */}
              <div className="space-y-3 group">
                <Label className="text-foreground font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Destination Airport
                </Label>
                <Select onValueChange={(value) => handleInputChange('dest', value)}>
                  <SelectTrigger className="h-12 bg-background/80 border-2 border-border hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all duration-200 rounded-xl">
                    <SelectValue placeholder="Arrival airport" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-primary">{airport.code}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm">{airport.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Departure Delay */}
              <div className="space-y-3 group col-span-1 md:col-span-2 lg:col-span-1">
                <Label className="text-foreground font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Departure Delay (minutes)
                </Label>
                <Select onValueChange={(value) => handleInputChange('depDelay', value)}>
                  <SelectTrigger className="h-12 bg-background/80 border-2 border-border hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all duration-200 rounded-xl">
                    <SelectValue placeholder="Select delay" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="-10">-10 (Early)</SelectItem>
                    <SelectItem value="-5">-5 (Early)</SelectItem>
                    <SelectItem value="0">0 (On Time)</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit"
                size="lg"
                className="w-full text-xl py-8 rounded-full shadow-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-700 hover:via-cyan-600 hover:to-teal-500 hover:scale-105 hover:shadow-2xl transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>Analyzing Flight Data...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Plane className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                    <span>Predict Flight Delay</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Prediction Result */}
      {prediction && (
        <Card className={`animate-fade-in shadow-3xl border-4 rounded-3xl transition-all duration-500 ${
          prediction.predicted_delay === 'Delay'
            ? 'border-red-400 bg-gradient-to-br from-red-100 via-yellow-50 to-pink-50 dark:from-red-900/30 dark:to-yellow-900/30'
            : 'border-teal-400 bg-gradient-to-br from-green-100 via-teal-50 to-cyan-50 dark:from-green-900/30 dark:to-teal-900/30'
        }`}>
          <CardHeader className="text-center pb-4">
            <CardTitle className={`text-2xl flex items-center justify-center gap-3 ${
              prediction.predicted_delay === 'Delay' ? 'text-red-600 dark:text-red-400' : 'text-teal-600 dark:text-teal-300'
            }`}>
              {prediction.predicted_delay === 'Delay' ? (
                <XCircle className="w-8 h-8 animate-pulse" />
              ) : (
                <CheckCircle className="w-8 h-8 animate-pulse" />
              )}
              Prediction Result
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xl font-bold ${
                prediction.predicted_delay === 'Delay'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                  : 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
              }`}>
                {prediction.predicted_delay === 'Delay' ? '❌' : '✅'} {prediction.predicted_delay}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FlightPredictionForm;
