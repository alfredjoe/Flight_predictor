import FlightPredictionForm from '@/components/FlightPredictionForm';
import { Shield, Zap } from 'lucide-react';
import heroImage from '@/assets/flight-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-[60vh] lg:h-[70vh] w-full bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Dark overlay for hero image */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/70 to-black/70"></div>
          
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                FlightPredictor AI
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-lg">
                Predict flight delays with advanced AI technology. Get accurate forecasts based on real flight data.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-white/90">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Reliable Data</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Your Flight Delay Prediction
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your flight details below and our AI will analyze historical data, weather patterns,
            and airline performance to predict potential delays.
          </p>
        </div>

        <FlightPredictionForm />
      </div>

      {/* Features Section */}
      {/* Backend Integration Note */}
    </div>
  );
};

export default Index;
