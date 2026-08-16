package main

import (
	"strings"
	"testing"
)

func TestRunCommand(t *testing.T) {
	cases := []struct{ in, want string }{
		{"help", "available commands"},
		{"whoami", "pratik"},
		{"about", "Pratik Wayal"},
		{"projects", "Robocon 2024"},
		{"contact", email},
		{"sudo rm -rf /", "Permission denied"},
		{"bogus", "command not found"},
		{"", ""},
	}
	for _, c := range cases {
		got := runCommand(c.in)
		if c.want == "" {
			if got != "" {
				t.Errorf("runCommand(%q) = %q, want empty", c.in, got)
			}
			continue
		}
		if !strings.Contains(got, c.want) {
			t.Errorf("runCommand(%q) missing %q, got %q", c.in, c.want, got)
		}
	}
	if runCommand("exit") != "__EXIT__" {
		t.Error("exit should return __EXIT__")
	}
}