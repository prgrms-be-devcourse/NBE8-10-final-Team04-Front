import {Component, type ReactNode, type ErrorInfo} from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-lg font-semibold text-destructive">화면을 불러오는 중 오류가 발생했습니다.</p>
            <p className="text-sm text-muted-foreground max-w-md">{this.state.error?.message}</p>
            <button
              className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
              onClick={() => {
                this.setState({hasError: false, error: null});
                this.props.onReset?.();
              }}
            >
              다시 시도
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
